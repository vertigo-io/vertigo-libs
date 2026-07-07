import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DsfrComponentTooltip from '../components/DsfrTooltip/DsfrComponentTooltip.vue'
import DsfrButtonTooltip from '../components/DsfrTooltip/DsfrButtonTooltip.vue'
import DsfrLinkTooltip from '../components/DsfrTooltip/DsfrLinkTooltip.vue'

describe('DsfrButtonTooltip', () => {
  it('renders bouton avec label', () => {
    const wrapper = mount(DsfrButtonTooltip, {
      props: { label: 'Action' }
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toContain('Action')
  })
})

describe('DsfrLinkTooltip', () => {
  it('renders lien', () => {
    const wrapper = mount(DsfrLinkTooltip, {
      props: { label: 'Lien', href: '/page' }
    })
    expect(wrapper.find('a').exists()).toBe(true)
  })
})

describe('DsfrComponentTooltip', () => {
  it('renders bouton avec label', () => {
    const wrapper = mount(DsfrComponentTooltip, {
      props: { label: 'Help', icon: 'fr-question-line' }
    })
    expect(wrapper.find('button').exists()).toBe(true)
    // The button should exist with text content from label
    expect(wrapper.find('button').text()).toContain('Help')
  })
})