require 'pathname'

def make_apps(dst, src, deps)
	apps = File.join(src, "apps")

	FileList["#{apps}/*"].map do |a|
		n = Pathname.new(a).relative_path_from(Pathname.new(apps)).to_s

		res = []
		tscs = FileList["#{a}/**/*.ts"]
		scss = FileList['#{a}/**/*.scss']

		FileList["#{a}/**/*"].each do |s|
			d = File.join(
				dst,
				Pathname.new(s).relative_path_from(Pathname.new(src)).to_s)

			if d.end_with? '.main.ts'
				d.gsub!(/\.ts/, '.js')
				file d => tscs + deps do
					sh 'tsc', '--out', d, s
				end
			elsif d.end_with? '.scss'
				d.gsub! /\.scss/, '.css'
				file d => scss do
					sh 'scss', '--style=compact', '--no-cache', s, d
				end
			elsif d.end_with? '.ts'
				next
			elsif File.directory?(s)
				file d => s do
					mkdir_p d
				end
			else
				file d => s do
					cp s, d
				end
			end
			res << d
		end

		ns = n.to_sym
		task ns => res

		task "run-#{n}".to_sym => ns do
			sh 'electron', File.join(dst, 'apps', n, 'app.main.js')
		end

		ns
	end
end
