const path = require('path')
const sao = require('sao')

const generator = path.join(__dirname, '..')

describe('test', () => {
  it('defaults', async () => {
    const mockPromptAnswers = {
      name: 'cloud',
      username: 'username',
      email: 'placholder@mymail.com'
    }

    const stream = await sao.mock({ generator }, mockPromptAnswers)

    expect(stream.fileList).toMatchSnapshot('Generated files')

    const pkg = JSON.parse(await stream.readFile('package.json'))
    expect(pkg.name).toBe('cloud')
    expect(pkg.author).toBe('username <placholder@mymail.com>')

    expect(await stream.readFile('readme.md')).toMatchSnapshot('readme.md')
    expect(await stream.readFile('.editorconfig')).toMatchSnapshot('.editorconfig')
  })
})
