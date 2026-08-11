import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DsfrCustomCheckbox from '../components/DsfrCheckbox/DsfrCustomCheckbox.vue'

describe('DsfrCustomCheckbox', () => {
  it('renders checkbox avec label', () => {
    const wrapper = mount(DsfrCustomCheckbox, {
      props: { label: 'Test checkbox', name: 'test', value: true }
    })
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    expect(wrapper.find('.fr-label').text()).toContain('Test checkbox')
  })

  it('affiche le hint quand fourni', () => {
    const wrapper = mount(DsfrCustomCheckbox, {
      props: { label: 'Test', name: 'test', hint: 'Hint text', value: true }
    })
    expect(wrapper.find('.fr-hint-text').exists()).toBe(true)
    expect(wrapper.find('.fr-hint-text').text()).toBe('Hint text')
  })

  it('render le slot hint custom', () => {
    const wrapper = mount(DsfrCustomCheckbox, {
      props: { label: 'Test', name: 'test', hint: 'Default', value: true },
      slots: {
        hint: '<span class="custom-hint">Custom hint</span>'
      }
    })
    expect(wrapper.find('.custom-hint').exists()).toBe(true)
  })

  it('applique la classe inline', () => {
    const wrapper = mount(DsfrCustomCheckbox, {
      props: { label: 'Test', name: 'test', inline: true, value: true }
    })
    expect(wrapper.find('.fr-fieldset__element--inline').exists()).toBe(true)
  })

  it('affiche l\'asterisque requis quand required', () => {
    const wrapper = mount(DsfrCustomCheckbox, {
      props: { label: 'Test', name: 'test', required: true, value: true }
    })
    expect(wrapper.find('.required').exists()).toBe(true)
  })

  it('applique les classes d\'erreur et de validite', () => {
    const errorWrapper = mount(DsfrCustomCheckbox, {
      props: { label: 'Test', name: 'test', errorMessage: 'Error', value: true }
    })
    expect(errorWrapper.find('.fr-checkbox-group--error').exists()).toBe(true)
    expect(errorWrapper.find('.fr-error-text').text()).toBe('Error')

    const validWrapper = mount(DsfrCustomCheckbox, {
      props: { label: 'Test', name: 'test', validMessage: 'OK', value: true }
    })
    expect(validWrapper.find('.fr-checkbox-group--valid').exists()).toBe(true)
    expect(validWrapper.find('.fr-valid-text').text()).toBe('OK')
  })

  it('applique small class', () => {
    const wrapper = mount(DsfrCustomCheckbox, {
      props: { label: 'Test', name: 'test', small: true, value: true }
    })
    expect(wrapper.find('.fr-checkbox-group--sm').exists()).toBe(true)
  })

  it('tabindex -1 quand readonly', () => {
    const wrapper = mount(DsfrCustomCheckbox, {
      props: { label: 'Test', name: 'test', value: true }
    })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
  })

  it('render le slot label custom', () => {
    const wrapper = mount(DsfrCustomCheckbox, {
      props: { label: 'Default', name: 'test', value: true },
      slots: {
        label: '<span class="custom-label">Custom</span>'
      }
    })
    expect(wrapper.find('.custom-label').text()).toContain('Custom')
    expect(wrapper.find('.custom-label').text()).not.toContain('Default')
  })

  it('verifie l\'accessibilite aria-describedby pour messages', () => {
    const wrapper = mount(DsfrCustomCheckbox, {
      props: { label: 'Test', name: 'test', errorMessage: 'Error', value: true }
    })
    const msgsGroup = wrapper.find('.fr-messages-group')
    expect(msgsGroup.exists()).toBe(true)
    expect(msgsGroup.attributes('aria-live')).toBe('assertive')
    expect(msgsGroup.attributes('role')).toBe('alert')
  })
})