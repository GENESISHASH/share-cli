# vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2
log = (x...) -> try console.log x...

_ = require('wegweg')({
  globals: on
  shelljs: on
})

if !_.arg('file')
  throw new Error '`--file` required'

file = _.resolve(_.arg 'file')

if !_.exists(file)
  throw new Error 'File noexists'

creds = JSON.parse(__dirname + '/../config.json')

# @todo: share file..
# ..

##
if !module.parent
  log /DEVEL/
  process.exit 0

