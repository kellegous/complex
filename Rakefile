include Rake::DSL

require './build'

apps = make_apps('out', 'src', FileList['src/lib/**/*'])

task :default => apps
task :clean do
	rm_rf 'out'
end