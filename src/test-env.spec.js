const { directory } = require('tempy');
const { pathExists } = require('fs-extra');
const { resolve } = require('path');
const execa = require('execa');
const {
  clone,
  createOrigin,
  setupWorkspace,
  setupProject,
} = require('./test-env');

describe('test-env', () => {
  const semanticReleaseMonorepo = process.cwd();
  const defaultPlugin = resolve(semanticReleaseMonorepo, 'src');

  beforeEach(() => {
    process.env.Path += ';C:\\Program Files\\Git\\mingw64\\bin';
    // TODO : ajouter des commentaires de méthodes
  });

  it('creates an origin git repository', async () => {
    const originDirectory = await createOrigin();
    expect(await pathExists(originDirectory)).toBe(true);
    expect(
      (
        await execa('git', [
          'ls-remote',
          '--heads',
          `file://${originDirectory}`,
        ])
      ).stdout
    ).toBe('');
  });

  it('clones a git repository', async () => {
    const originDirectory = await createOrigin();
    const gitRepoUrl = `file://${originDirectory}`;
    const gitRoot = await clone(gitRepoUrl);
    expect(await pathExists(gitRoot)).toBe(true);
  });

  it('initializes a workspace', async () => {
    const gitRoot = await setupWorkspace();
    expect(await pathExists(resolve(gitRoot, 'package.json'))).toBe(true);
    expect(await pathExists(resolve(gitRoot, '.releaserc.json'))).toBe(true);
  });

  it('adds a project to the workspace', async () => {
    const gitRoot = await setupWorkspace();
    const projectName = 'test';
    await setupProject(gitRoot, projectName, defaultPlugin);
    expect(
      await pathExists(
        resolve(gitRoot, 'projects', projectName, 'package.json')
      )
    ).toBe(true);
  }, 30000);

  it('creates a test environment', async () => {
    // TODO x2
  }, 30000);
});
