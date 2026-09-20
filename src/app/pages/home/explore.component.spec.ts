import { ExploreComponent } from './explore.component';

describe('Explore interactions', () => {
  let component: ExploreComponent;
  beforeEach(() => component = new ExploreComponent());
  it('rejects foreign drops and duplicate modules', () => {
    component.addNode('Usuarios'); component.addNode('Usuarios'); component.addNode('foreign text');
    expect(component.nodes).toEqual(['Usuarios']);
  });
  it('stops the running connection when the architecture changes', () => {
    component.wiring = true; component.addNode('Ventas');
    expect(component.wiring).toBeFalse();
  });
  it('keeps slides in bounds and filters real project technologies', () => {
    component.projects = [{name: 'A', tech: ['Angular'], description: '', result: '', status: ''}, {name: 'B', tech: ['CSS'], description: '', result: '', status: ''}];
    component.nextSlide(-1); expect(component.slide).toBe(0);
    component.nextSlide(10); expect(component.slide).toBe(1);
    component.mapTech = 'CSS'; expect(component.matchingProjects.map(p => p.name)).toEqual(['B']);
  });
  it('carries the chosen story into a WhatsApp consultation', () => {
    component.problem = 'Organizar operaciones'; component.priority = 'Crecer por etapas';
    expect(decodeURIComponent(component.storyLink)).toContain('Organizar operaciones');
    expect(decodeURIComponent(component.storyLink)).toContain('Crecer por etapas');
    expect(component.recommendation).toContain('stock');
  });
});
