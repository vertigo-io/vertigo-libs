import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DsfrCustomSelect from '../components/DsfrSelect/DsfrCustomSelect.vue'

describe('DsfrCustomSelect', () => {
  it('renders select avec label et options', () => {
    const wrapper = mount(DsfrCustomSelect, {
      props: {
        label: 'Choisir',
        options: [
          { value: 1, text: 'Option 1' },
          { value: 'a', text: 'Option A' }
        ]
      }
    })
    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.findAll('option').length).toBe(3) // default + 2 options
    expect(wrapper.find('label').text()).toContain('Choisir')
  })

  it('convertit la valeur en nombre quand options sont numeriques', async () => {
    const wrapper = mount(DsfrCustomSelect, {
      props: {
        options: [
          { value: '', text: 'Choisir' },
          { value: 1, text: 'Un' },
          { value: 2, text: 'Deux' }
        ]
      }
    })
    const select = wrapper.find('select')
    await select.setValue('2')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted[0][0]).toBe(2) // number, pas string '2'
  })

  it('conserve la valeur string quand les options sont des strings', async () => {
    const wrapper = mount(DsfrCustomSelect, {
      props: {
        options: [
          { value: 'a', text: 'A' },
          { value: 'b', text: 'B' }
        ]
      }
    })
    const select = wrapper.find('select')
    await select.setValue('b')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted[0][0]).toBe('b')
  })

  it('convertit la valeur vide a null', async () => {
    const wrapper = mount(DsfrCustomSelect, {
      props: {
        options: [
          { value: '', text: 'Choisir' }
        ]
      }
    })
    const select = wrapper.find('select')
    await select.setValue('')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted[0][0]).toBe(null)
  })

  it('showUnselected false cache et desactive la valeur par defaut', () => {
    const wrapper = mount(DsfrCustomSelect, {
      props: {
        options: [
          { value: 1, text: 'Un' },
          { value: 2, text: 'Deux' }
        ],
        showUnselected: false
      }
    })
    const defaultOption = wrapper.findAll('option')[0]
    expect(defaultOption.attributes('hidden')).toBeDefined()
    expect(defaultOption.attributes('disabled')).toBeDefined()
  })

  it('showUnselected true affiche la valeur par defaut', () => {
    const wrapper = mount(DsfrCustomSelect, {
      props: {
        options: [
          { value: 1, text: 'Un' }
        ],
        showUnselected: true
      }
    })
    const defaultOption = wrapper.findAll('option')[0]
    expect(defaultOption.attributes('hidden')).toBeUndefined()
    expect(defaultOption.attributes('disabled')).toBeUndefined()
  })

  it('option selectionnee est marquee', () => {
    const wrapper = mount(DsfrCustomSelect, {
      props: {
        modelValue: 2,
        options: [
          { value: 1, text: 'Un' },
          { value: 2, text: 'Deux' }
        ]
      }
    })
    const options = wrapper.findAll('option')
    // Skip default unselected option
    const selectedOption = options.find(opt => opt.text().includes('Deux'))
    expect(selectedOption?.attributes('selected')).toBeDefined()
  })

  it('applique les attributs disabled', () => {
    const wrapper = mount(DsfrCustomSelect, {
      props: {
        disabled: true,
        options: [
          { value: 1, text: 'Un' }
        ]
      }
    })
    expect(wrapper.find('select').attributes('disabled')).toBeDefined()
    expect(wrapper.find('select').attributes('aria-disabled')).toBe('true')
  })

  it('affiche le message d\'erreur', () => {
    const wrapper = mount(DsfrCustomSelect, {
      props: {
        options: [{ value: 1, text: 'Un' }],
        errorMessage: 'Erreur'
      }
    })
    expect(wrapper.find('.fr-error-text').exists()).toBe(true)
    expect(wrapper.find('.fr-error-text').text()).toBe('Erreur')
    expect(wrapper.find('.fr-select-group--error').exists()).toBe(true)
  })

  it('affiche le message de succes', () => {
    const wrapper = mount(DsfrCustomSelect, {
      props: {
        options: [{ value: 1, text: 'Un' }],
        successMessage: 'Valide'
      }
    })
    expect(wrapper.find('.fr-valid-text').exists()).toBe(true)
    expect(wrapper.find('.fr-valid-text').text()).toBe('Valide')
    expect(wrapper.find('.fr-select-group--valid').exists()).toBe(true)
  })

  it('option disablee avec disabled prop', () => {
    const wrapper = mount(DsfrCustomSelect, {
      props: {
        options: [
          { value: 1, text: 'Un' },
          { value: 2, text: 'Deux', disabled: true }
        ]
      }
    })
    const options = wrapper.findAll('option')
    const disabledOpt = options.find(opt => opt.text().includes('Deux'))
    expect(disabledOpt?.attributes('disabled')).toBeDefined()
    expect(disabledOpt?.attributes('aria-disabled')).toBe('true')
  })

  it('options comme strings simples', () => {
    const wrapper = mount(DsfrCustomSelect, {
      props: {
        options: ['Option A', 'Option B']
      }
    })
    const options = wrapper.findAll('option')
    expect(options.find(opt => opt.text().includes('Option A'))).toBeDefined()
    expect(options.find(opt => opt.text().includes('Option B'))).toBeDefined()
  })

  it('hint est affiche dans le label', () => {
    const wrapper = mount(DsfrCustomSelect, {
      props: {
        hint: 'Selectionnez une option',
        options: [{ value: 1, text: 'Un' }]
      }
    })
    expect(wrapper.find('.fr-hint-text').exists()).toBe(true)
    expect(wrapper.find('.fr-hint-text').text()).toBe('Selectionnez une option')
  })

  it('required affiche asterisque', () => {
    const wrapper = mount(DsfrCustomSelect, {
      props: {
        required: true,
        options: [{ value: 1, text: 'Un' }]
      }
    })
    expect(wrapper.find('select').attributes('required')).toBeDefined()
    expect(wrapper.find('.required').exists()).toBe(true)
  })
})