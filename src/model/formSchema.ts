const configSchema = {
  type: 'object',
  required: [],
  properties: {
    'titleColor': {
      type: 'string',
      format: 'color',
    },
    'descriptionColor': {
      type: 'string',
      format: 'color',
    },
    'backgroundColor': {
      type: 'string',
      format: 'color',
    },
    'transparent': {
      type: 'boolean',
    },
    'item': {
      type: 'object',
      properties: {
        'itemTitleColor': {
          type: 'string',
          format: 'color',
        },
        'itemDescriptionColor': {
          type: 'string',
          format: 'color',
        },
        'itemLink': {
          type: 'object',
          properties: {
            'itemLinkColor': {
              type: 'string',
              format: 'color',
            },
            'itemLinkBackgroundColor': {
              type: 'string',
              format: 'color',
            },
            'itemLinkTransparent': {
              type: 'boolean',
            }
          },
        },
        'itemImage': {
          type: 'object',
          properties: {
            'width': {
              type: 'string',
            },
            'height': {
              type: 'string',
            },
          },
        },
        'itemBackgroundColor': {
          type: 'string',
          format: 'color',
        },
        'itemTransparent': {
          type: 'boolean',
        }
      }
    },
  }
}
