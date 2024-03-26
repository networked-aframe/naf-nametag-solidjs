/* global AFRAME NAF */

// Temporary workaround for template declaration; see issue 167
NAF.schemas.getComponentsOriginal = NAF.schemas.getComponents;
NAF.schemas.getComponents = (template) => {
  if (!NAF.schemas.hasTemplate('#head-template')) {
    NAF.schemas.add({
      template: '#head-template',
      components: [
        {
          component: 'position',
          requiresNetworkUpdate: NAF.utils.vectorRequiresUpdate(0.001),
        },
        {
          component: 'rotation',
          requiresNetworkUpdate: NAF.utils.vectorRequiresUpdate(0.5),
        },
        'player-info',
      ],
    });
  }

  const components = NAF.schemas.getComponentsOriginal(template);
  return components;
};

AFRAME.registerComponent('player-info', {
  schema: {
    name: { type: 'string', default: 'anonymous' },
    color: { type: 'color', default: '#ffffff' },
    muted: { type: 'boolean', default: false },
  },

  init: function () {
    this.head = this.el.querySelector('.head');
    this.nametag = this.el.querySelector('.nametag');
    this.updatedEventDetail = { el: undefined, data: undefined, oldData: undefined };
  },

  update: function (oldData) {
    this.updatedEventDetail.data = this.data;
    this.updatedEventDetail.oldData = oldData;
    this.updatedEventDetail.el = this.el;
    this.el.sceneEl.emit('player-info-updated', this.updatedEventDetail);
    this.updatedEventDetail.data = undefined;
    this.updatedEventDetail.oldData = undefined;
    this.updatedEventDetail.el = undefined;
    if (this.head) this.head.setAttribute('material', 'color', this.data.color);
    if (this.nametag) this.nametag.setAttribute('value', this.data.name);
  },
});
