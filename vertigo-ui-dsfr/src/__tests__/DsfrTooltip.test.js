import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DsfrComponentTooltip from '../components/DsfrTooltip/DsfrComponentTooltip.vue'
import DsfrButtonTooltip from '../components/DsfrTooltip/DsfrButtonTooltip.vue'
import DsfrLinkTooltip from '../components/DsfrTooltip/DsfrLinkTooltip.vue'

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('DsfrComponentTooltip - rendering', () => {
  it('renders bouton par defaut (pas de href)', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Action', icon: 'fr-icon-info-line' }
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').classes()).toContain('fr-btn')
  })

  it('renders lien quand href fourni', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Lien', icon: 'fr-icon-link-line', href: '/page' }
    })
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('/page')
  })

  it('applique classe fr-link quand isLink', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Lien', icon: 'fr-icon-link-line', isLink: true }
    })
    expect(wrapper.find('button').classes()).toContain('fr-link')
    expect(wrapper.find('button').classes()).not.toContain('fr-btn')
  })

  it('ne PAS appliquer fr-link quand inline', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Lien', icon: 'fr-icon-link-line', isLink: true, inline: true }
    })
    expect(wrapper.find('button').classes()).not.toContain('fr-link')
  })
})

describe('DsfrComponentTooltip - variants bouton', () => {
  it('applique fr-btn--secondary', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line', secondary: true }
    })
    expect(wrapper.find('button').classes()).toContain('fr-btn--secondary')
  })

  it('applique fr-btn--tertiary', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line', tertiary: true }
    })
    expect(wrapper.find('button').classes()).toContain('fr-btn--tertiary')
  })

  it('applique fr-btn--tertiary-no-outline', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line', tertiary: true, noOutline: true }
    })
    expect(wrapper.find('button').classes()).toContain('fr-btn--tertiary-no-outline')
    expect(wrapper.find('button').classes()).not.toContain('fr-btn--tertiary')
  })

  it('aucune classe quand secondary + tertiary ensemble', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line', secondary: true, tertiary: true }
    })
    expect(wrapper.find('button').classes()).not.toContain('fr-btn--secondary')
    expect(wrapper.find('button').classes()).not.toContain('fr-btn--tertiary')
  })
})

describe('DsfrComponentTooltip - tailles', () => {
  it('applique fr-btn--sm avec sm', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line', size: 'sm' }
    })
    expect(wrapper.find('button').classes()).toContain('fr-btn--sm')
  })

  it('applique fr-btn--sm avec small', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line', size: 'small' }
    })
    expect(wrapper.find('button').classes()).toContain('fr-btn--sm')
  })

  it('applique fr-btn--md avec md', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line', size: 'md' }
    })
    expect(wrapper.find('button').classes()).toContain('fr-btn--md')
  })

  it('applique fr-btn--md avec medium', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line', size: 'medium' }
    })
    expect(wrapper.find('button').classes()).toContain('fr-btn--md')
  })

  it('applique fr-btn--lg avec lg', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line', size: 'lg' }
    })
    expect(wrapper.find('button').classes()).toContain('fr-btn--lg')
  })

  it('applique fr-btn--lg avec large', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line', size: 'large' }
    })
    expect(wrapper.find('button').classes()).toContain('fr-btn--lg')
  })
})

describe('DsfrComponentTooltip - icon', () => {
  it('applique classe fr-icon-* avec icone DSFR', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-home-line' }
    })
    expect(wrapper.find('button').classes()).toContain('fr-icon-home-line')
  })

  it('applique fr-btn--icon-left par defaut', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-home-line' }
    })
    expect(wrapper.find('button').classes()).toContain('fr-btn--icon-left')
    expect(wrapper.find('button').classes()).not.toContain('fr-btn--icon-right')
  })

  it('applique fr-btn--icon-right quand iconRight', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-home-line', iconRight: true }
    })
    expect(wrapper.find('button').classes()).toContain('fr-btn--icon-right')
  })

  it('applique fr-link--icon-* pour les liens', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Lien', icon: 'fr-icon-link-line', isLink: true }
    })
    expect(wrapper.find('button').classes()).toContain('fr-link--icon-left')
  })

  it('applique inline-flex et reverse pour icone non-DSFR', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'logo.png', iconRight: true }
    })
    expect(wrapper.find('button').classes()).toContain('inline-flex')
    expect(wrapper.find('button').classes()).toContain('reverse')
  })

  it('applique fr-btn--custom-tooltip quand iconOnly', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Help', icon: 'fr-icon-question-line', iconOnly: true }
    })
    expect(wrapper.find('button').classes()).toContain('fr-btn--custom-tooltip')
  })

  it('applique justify-center quand iconOnly + icone non-DSFR', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Help', icon: 'logo.png', iconOnly: true }
    })
    expect(wrapper.find('button').classes()).toContain('justify-center')
  })

  it('affiche label en screen-reader quand iconOnly', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Help', icon: 'fr-icon-question-line', iconOnly: true }
    })
    const sr = wrapper.find('.fr-sr-only')
    expect(sr.exists()).toBe(true)
    expect(sr.text()).toBe('Help')
  })

  it('affiche label visible quand pas iconOnly', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Visible', icon: 'fr-icon-info-line' }
    })
    expect(wrapper.find('button').text()).toContain('Visible')
    expect(wrapper.find('.fr-sr-only').exists()).toBe(false)
  })
})

describe('DsfrComponentTooltip - tooltip', () => {
  it('affiche role=tooltip sur le p', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line', content: 'Info' }
    })
    const tooltip = wrapper.find('p')
    expect(tooltip.attributes('role')).toBe('tooltip')
    expect(tooltip.classes()).toContain('fr-tooltip')
  })

  it('applique aria-hidden=true sur le tooltip', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line', content: 'Info' }
    })
    expect(wrapper.find('p').attributes('aria-hidden')).toBe('true')
  })

  it('utilise le content prop par defaut', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line', content: 'Tooltip text' }
    })
    expect(wrapper.find('p').text()).toBe('Tooltip text')
  })

  it('priorise le slot au contenu par defaut', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line', content: 'Default' },
      slots: { default: '<span class="custom">Custom content</span>' }
    })
    expect(wrapper.find('.custom').text()).toBe('Custom content')
  })

  it('applique fr-placement--bottom par defaut', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line', content: 'Info' }
    })
    expect(wrapper.find('p').classes()).toContain('fr-placement--bottom')
  })
})

describe('DsfrComponentTooltip - accessibilite et etat', () => {
  it('applique aria-disabled et button id', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { id: 'myid', label: 'Test', icon: 'fr-icon-info-line', disabled: true }
    })
    const btn = wrapper.find('button')
    expect(btn.attributes('aria-disabled')).toBe('true')
    expect(btn.attributes('aria-labelledby')).toBe('myid')
    expect(btn.attributes('id')).toBe('button-myid')
  })

  it('applique id aleatoire par defaut', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line' }
    })
    const btn = wrapper.find('button')
    expect(btn.attributes('id')).toMatch(/^button-tooltip-/)
  })

  it('applique aria-labelledby sur bouton', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { id: 'myid', label: 'Test', icon: 'fr-icon-info-line' }
    })
    expect(wrapper.find('button').attributes('aria-labelledby')).toBe('myid')
  })

  it('applique id sur le tooltip', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { id: 'myid', label: 'Test', icon: 'fr-icon-info-line' }
    })
    expect(wrapper.find('p').attributes('id')).toBe('myid')
  })

  it('desactive href quand disabled + href', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Lien', icon: 'fr-icon-link-line', href: '/page', disabled: true }
    })
    expect(wrapper.find('a').attributes('href')).toBe(undefined)
  })
})

describe('DsfrButtonTooltip - wrapper', () => {
  it('renders bouton avec label', () => {
    const wrapper = mount(DsfrButtonTooltip, {
      props: { label: 'Action', icon: 'fr-icon-info-line' }
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toContain('Action')
  })

  it('slot passe au component interne', () => {
    const wrapper = mount(DsfrButtonTooltip, {
      props: { label: 'Label', icon: 'fr-icon-info-line' },
      slots: { default: '<span class="slot-icon">i</span>' }
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('.slot-icon').exists()).toBe(true)
  })

  it('propage les props via $attrs', () => {
    const wrapper = mount(DsfrButtonTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line', secondary: true, size: 'lg' }
    })
    expect(wrapper.find('button').classes()).toContain('fr-btn--secondary')
    expect(wrapper.find('button').classes()).toContain('fr-btn--lg')
  })

  it('applique disabled', () => {
    const wrapper = mount(DsfrButtonTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line', disabled: true }
    })
    expect(wrapper.find('button').attributes('aria-disabled')).toBe('true')
  })
})

describe('DsfrLinkTooltip - wrapper', () => {
  it('renders bouton (pas de href) par defaut', () => {
    const wrapper = mount(DsfrLinkTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line' }
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('applique fr-link par defaut (asButton=false)', () => {
    const wrapper = mount(DsfrLinkTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line' }
    })
    expect(wrapper.find('button').classes()).toContain('fr-link')
  })

  it('applique fr-btn quand asButton=true', () => {
    const wrapper = mount(DsfrLinkTooltip, {
      props: { label: 'Test', icon: 'fr-icon-info-line', asButton: true }
    })
    expect(wrapper.find('button').classes()).toContain('fr-btn')
    expect(wrapper.find('button').classes()).not.toContain('fr-link')
  })

  it('applique href sur lien', () => {
    const wrapper = mount(DsfrLinkTooltip, {
      props: { label: 'Lien', icon: 'fr-icon-link-line', href: '/page' }
    })
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('/page')
  })

  it('applique fr-link sur lien avec href', () => {
    const wrapper = mount(DsfrLinkTooltip, {
      props: { label: 'Lien', icon: 'fr-icon-link-line', href: '/page' }
    })
    expect(wrapper.find('a').classes()).toContain('fr-link')
  })

  it('propage tooltip content', () => {
    const wrapper = mount(DsfrLinkTooltip, {
      props: { label: 'Lien', icon: 'fr-icon-link-line', content: 'Info' }
    })
    expect(wrapper.find('p').text()).toBe('Info')
  })

  it('propage variant et taille', () => {
    const wrapper = mount(DsfrLinkTooltip, {
      props: { label: 'Lien', icon: 'fr-icon-info-line', tertiary: true, size: 'sm', href: '/p' }
    })
    expect(wrapper.find('a').classes()).toContain('fr-btn--tertiary')
    expect(wrapper.find('a').classes()).toContain('fr-btn--sm')
  })
})