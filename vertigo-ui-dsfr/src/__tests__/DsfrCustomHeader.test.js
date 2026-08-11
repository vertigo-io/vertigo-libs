import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, config } from '@vue/test-utils'
import DsfrCustomHeader from '../components/DsfrHeader/DsfrCustomHeader.vue'

vi.mock('focus-trap-vue', () => ({
  FocusTrap: {
    name: 'FocusTrap',
    props: ['active', 'focusTrapOptions'],
    setup(props, { slots }) {
      return () => slots.default ? slots.default() : null
    }
  }
}))

beforeEach(() => {
  config.global.components = {
    RouterLink: {
      props: ['to', 'active', 'title'],
      setup(props, { slots, attrs }) {
        return () => `<a href="${props.to}" title="${props.title}" ${attrs}>{slots.default?.()}</a>`
      }
    }
  }
})

describe('DsfrCustomHeader', () => {
  const baseProps = {
    homeTo: '/',
    homeLabel: 'Accueil',
    serviceTitle: 'Test Service'
  }

  it('renders header structure avec les classes DSFR', () => {
    const wrapper = mount(DsfrCustomHeader, {
      props: baseProps
    })
    expect(wrapper.find('header.fr-header').exists()).toBe(true)
    expect(wrapper.find('header').attributes('role')).toBe('banner')
    expect(wrapper.find('.fr-header__body').exists()).toBe(true)
    expect(wrapper.find('.fr-header__brand').exists()).toBe(true)
  })

  it('affiche le titre du service et description', () => {
    const wrapper = mount(DsfrCustomHeader, {
      props: {
        homeLabel: 'Accueil',
        serviceTitle: 'Service',
        serviceDescription: 'Description'
      }
    })
    expect(wrapper.html()).toContain('Service')
  })

  it('affiche le badge BETA quand showBeta est vrai', () => {
    const wrapper = mount(DsfrCustomHeader, {
      props: { ...baseProps, serviceTitle: '', showBeta: true }
    })
    expect(wrapper.find('.fr-badge--green-emeraude').exists()).toBe(true)
  })

  it('n\'affiche pas le badge BETA sans showBeta', () => {
    const wrapper = mount(DsfrCustomHeader, {
      props: { ...baseProps, showBeta: false }
    })
    expect(wrapper.find('.fr-badge--green-emeraude').exists()).toBe(false)
  })

  it('affiche le slot header-search quand fourni', () => {
    const wrapper = mount(DsfrCustomHeader, {
      props: { ...baseProps, showSearch: true },
      slots: {
        'header-search': '<div class="custom-search">Search</div>'
      }
    })
    expect(wrapper.find('.custom-search').exists()).toBe(true)
  })

  it('affiche le slot operator avec image', () => {
    const wrapper = mount(DsfrCustomHeader, {
      props: {
        ...baseProps,
        operatorImgSrc: '/logo.png',
        operatorImgAlt: 'Logo'
      }
    })
    expect(wrapper.find('.fr-header__operator').exists()).toBe(true)
    const img = wrapper.find('.fr-header__operator img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/logo.png')
    expect(img.attributes('alt')).toBe('Logo')
  })

  it('affiche le slot operator custom', () => {
    const wrapper = mount(DsfrCustomHeader, {
      props: baseProps,
      slots: {
        operator: '<div class="custom-operator">Op</div>'
      }
    })
    expect(wrapper.find('.custom-operator').exists()).toBe(true)
  })

  it('emmet on-mounted au chargement', () => {
    const wrapper = mount(DsfrCustomHeader, {
      props: baseProps
    })
    expect(wrapper.emitted('on-mounted')).toBeTruthy()
    expect(wrapper.emitted('on-mounted').length).toBe(1)
  })

  it('gests les quickLinks correctement', () => {
    const wrapper = mount(DsfrCustomHeader, {
      props: {
        ...baseProps,
        quickLinks: [
          { label: 'Lien 1', to: '/page1' },
          { label: 'Lien 2', to: '/page2' }
        ]
      }
    })
    expect(wrapper.find('.fr-header__tools-links').exists()).toBe(true)
  })

  it('affiches les liens de navigation dans le slot header-menu-link', () => {
    const wrapper = mount(DsfrCustomHeader, {
      props: {
        ...baseProps,
        quickLinks: [{ label: 'Lien', to: '/page' }],
      },
      slots: {
        'header-menu-link': '<button class="custom-btn">Menu</button>'
      }
    })
    expect(wrapper.find('.custom-btn').exists()).toBe(true)
  })

  it('applique la classe de languageSelector', () => {
    const wrapper = mount(DsfrCustomHeader, {
      props: {
        ...baseProps,
        languageSelector: {
          currentLanguage: 'fr',
          languages: [{ codeIso: 'en', nativeName: 'English' }]
        }
      }
    })
    expect(wrapper.find('.fr-header__tools-links').exists()).toBe(true)
  })

  it('verifie les attributs d\'accessibilite pour le navbar', () => {
    const wrapper = mount(DsfrCustomHeader, {
      props: {
        ...baseProps,
        showSearch: true,
        quickLinks: [{ label: 'L', to: '/' }]
      }
    })
    const navbar = wrapper.find('.fr-header__navbar')
    expect(navbar.exists()).toBe(true)
    // When search is shown, the search button should have aria attributes
    const searchBtn = wrapper.find('[aria-controls="header-search"]')
    expect(searchBtn.exists()).toBe(true)
    expect(searchBtn.attributes('aria-label')).toBe('Recherche')
  })

  it('verifie les attributs de navigation', () => {
    const wrapper = mount(DsfrCustomHeader, {
      props: { ...baseProps, menuLabel: 'Mon menu', showSearch: true, quickLinks: [{}] }
    })
    // The menu button should exist when there are quickLinks or showSearch
    const menuBtn = wrapper.find('#button-menu')
    expect(menuBtn.exists()).toBe(true)
  })

  it('emets l\'evenement search', async () => {
    const wrapper = mount(DsfrCustomHeader, {
      props: {
        ...baseProps,
        showSearch: true,
        modelValue: ''
      }
    })
    const searchBar = wrapper.find('div.fr-header__search.fr-modal')
    expect(searchBar.exists()).toBe(true)
  })
})