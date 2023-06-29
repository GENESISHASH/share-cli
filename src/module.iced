# vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2
log = (x...) -> try console.log x...

_ = require('wegweg')({
  globals: on
  shelljs: on
})

if !_.arg('file')
  if process.argv.length < 3
    throw new Error '`--file` required'

  if !_.exists(file = process.argv.pop())
    throw new Error '`--file` required'
else
  file = _.arg 'file'

file = _.resolve(file)

if !_.exists(file)
  throw new Error 'File noexists'

conf = require __dirname + '/../config'

##
aws = require 'aws-sdk'

aws.config.update({
  accessKeyId: conf.ACCESS
  secretAccessKey: conf.SECRET
})

s3 = new aws.S3()

new_filename = (do =>
  orig = _.base(file)
  orig = orig.split('.')
  extension = orig.pop()
  return _.uuid() + '.' + extension
)

opt = {
  Bucket: conf.BUCKET
  Key: new_filename
  ContentType: _.mime(new_filename)
  Body: require('fs').readFileSync(file)
}

await s3.upload opt, defer e,r
if e then throw e

log r.Location
exit 0

