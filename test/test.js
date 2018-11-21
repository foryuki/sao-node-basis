import path from 'path'
import test from 'ava'
import sao from 'sao'

const generator = path.join(__dirname, '..')

test('defaults', async t => {
  const mockPromptAnswers = {
    name: 'cloud',
    username: 'username',
    email: 'placholder@mymail.com'
  }

  const stream = await sao.mock({generator}, mockPromptAnswers)

  t.snapshot(stream.fileList, 'Generated files')

  const pkg = stream.readFile('package.json')
  // t.is(pkg.name, 'cloud')
  // t.is(pkg.username, 'username')
  // t.is(pkg.email, 'placholder@mymail.com')

  t.snapshot(await stream.readFile('readme.md'), 'readme.md')
  t.snapshot(await stream.readFile('.editorconfig'), '.editorconfig')
})
