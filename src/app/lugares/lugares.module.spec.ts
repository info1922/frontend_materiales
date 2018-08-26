import { LugaresModule } from './lugares.module';

describe('LugaresModule', () => {
  let lugaresModule: LugaresModule;

  beforeEach(() => {
    lugaresModule = new LugaresModule();
  });

  it('should create an instance', () => {
    expect(lugaresModule).toBeTruthy();
  });
});
