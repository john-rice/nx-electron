import { JsonObject } from '@angular-devkit/core';
jest.mock('tsconfig-paths-webpack-plugin');
import { PackageElectronBuilderOptions } from './package.impl';
import { Architect } from '@angular-devkit/architect';
import { getTestArchitect } from '../../utils/testing';

describe('ElectronBuildBuilder', () => {
  let testOptions: PackageElectronBuilderOptions & JsonObject;
  let architect: Architect;

  beforeEach(async () => {
    [architect] = await getTestArchitect();

    testOptions = {
      dir: '.',
      name: 'electronapp',
      frontendProject: 'frontend',
      out: 'dist/packages',
    };
  });

  describe('run', () => {

    it('should emit the outfile along with success', async () => {
      const run = await architect.scheduleBuilder(
        'nx-electron:build',
        testOptions
      );
      const output = await run.output.toPromise();

      await run.stop();

      expect(output.success).toEqual(true);
      expect(output.outputPath).toEqual('/root/dist/packages/electronapp-win32-x64');
    });
  });
});
