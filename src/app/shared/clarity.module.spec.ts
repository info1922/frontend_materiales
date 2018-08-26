import { ClarityModule } from './clarity.module';

describe('ClarityModule', () => {
  let clarityModule: ClarityModule;

  beforeEach(() => {
    clarityModule = new ClarityModule();
  });

  it('should create an instance', () => {
    expect(clarityModule).toBeTruthy();
  });
});
