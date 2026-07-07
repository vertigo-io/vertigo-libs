import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DsfrLink from '../components/DsfrLink/DsfrLink.vue'

describe('DsfrLink - custom props', () => {
  it('renders link avec label et href', () => {
    const wrapper = mount(DsfrLink, {
      props: { label: 'Mon lien', href: '/page' }
    })
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('/page')
    expect(link.text()).toBe('Mon lien')
  })

  it('applique href undefined quand disabled', () => {
    const wrapper = mount(DsfrLink, {
      props: { label: 'Lien', href: '/page', disabled: true }
    })
    expect(wrapper.find('a').attributes('href')).toBe(undefined)
  })

  it('applique classe fr-link pas inline', () => {
    const wrapper = mount(DsfrLink, {
      props: { label: 'Lien', href: '/page', inline: false }
    })
    expect(wrapper.find('a').classes()).toContain('fr-link')
  })

  it('ne PAS appliquer classe fr-link quand inline', () => {
    const wrapper = mount(DsfrLink, {
      props: { label: 'Lien', href: '/page', inline: true }
    })
    expect(wrapper.find('a').classes()).not.toContain('fr-link')
  })

  it('applique classe fr-btn quand asButton', () => {
    const wrapper = mount(DsfrLink, {
      props: { label: 'Lien', href: '/page', asButton: true }
    })
    expect(wrapper.find('a').classes()).toContain('fr-btn')
  })

  it('applique classe fr-icon-* quand icon fourni', () => {
    const wrapper = mount(DsfrLink, {
      props: { label: 'Lien', href: '/page', icon: 'fr-icon-home-line' }
    })
    expect(wrapper.find('a').classes()).toContain('fr-icon-home-line')
  })
})