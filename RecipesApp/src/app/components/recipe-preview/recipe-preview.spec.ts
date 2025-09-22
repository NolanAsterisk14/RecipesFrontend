import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePreview } from './recipe-preview';

describe('RecipePreview', () => {
  let component: RecipePreview;
  let fixture: ComponentFixture<RecipePreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipePreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipePreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
