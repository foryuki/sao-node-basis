const path = require('path')
const test = require('ava')
const sao = require('sao')

const generator = path.join(__dirname, '..')

test('defaults', async t => {
  const mockPromptAnswers = {
    name: 'cloud',
    username: 'username',
    email: 'placholder@mymail.com'
  }

  const stream = await sao.mock({ generator }, mockPromptAnswers)

  t.snapshot(stream.fileList, 'Generated files')

  const pkg = JSON.parse(await stream.readFile('package.json'))
  t.is(pkg.name, 'cloud')
  t.is(pkg.author, 'username <placholder@mymail.com>')

  t.snapshot(await stream.readFile('readme.md'), 'readme.md')
  t.snapshot(await stream.readFile('.editorconfig'), '.editorconfig')
})
