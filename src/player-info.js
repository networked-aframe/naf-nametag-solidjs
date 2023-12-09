/* global AFRAME NAF */

// Temporary workaround for template declaration; see issue 167
NAF.schemas.getComponentsOriginal = NAF.schemas.getComponents;
NAF.schemas.getComponents = (template) => {
  if (!NAF.schemas.hasTemplate('#head-template')) {
    NAF.schemas.add({
      template: '#head-template',
      components: ['position', 'rotation', 'player-info'],
    });
  }

  const components = NAF.schemas.getComponentsOriginal(template);
  return components;
};

AFRAME.registerComponent('player-info', {
  schema: {
    name: { type: 'string', default: 'anonymous' },
    color: { type: 'color', default: '#ffffff' },
  },

  init: function () {
    this.head = this.el.querySelector('.head');
    this.nametag = this.el.querySelector('.nametag');
  },

  update: function () {
    if (this.head) this.head.setAttribute('material', 'color', this.data.color);
    if (this.nametag) this.nametag.setAttribute('value', this.data.name);
  },
});
