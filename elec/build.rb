require 'pathname'

def make_apps(dst, src)
	deps = FileList["#{src}/apps/**/*"]
	res = []
	deps.each { |s|
		d = File.join(
			dst,
			Pathname.new(s).relative_path_from(Pathname.new(src)).to_s)
		if d.end_with? '.main.ts'
			d.gsub!(/\.ts/, '.js')
			file d => deps do
				sh 'tsc', '--out', d, s
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
	}
	res
end
