import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DsfrCustomPagination from '../components/DsfrDataTable/DsfrCustomPagination.vue'

describe('DsfrCustomPagination', () => {
  const pages = [
    { label: '1', title: 'Page 1', href: '/page/0' },
    { label: '2', title: 'Page 2', href: '/page/1' },
    { label: '3', title: 'Page 3', href: '/page/2' },
    { label: '4', title: 'Page 4', href: '/page/3' },
    { label: '5', title: 'Page 5', href: '/page/4' }
  ]

  it('renders la structure avec role navigation', () => {
    const wrapper = mount(DsfrCustomPagination, {
      props: { pages, currentPage: 0 }
    })
    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.find('nav').attributes('role')).toBe('navigation')
    expect(wrapper.find('nav').attributes('aria-label')).toBe('Pagination')
    expect(wrapper.find('.fr-pagination__list').exists()).toBe(true)
  })

  it('applique role button sur tous les liens', () => {
    const wrapper = mount(DsfrCustomPagination, {
      props: { pages, currentPage: 0 }
    })
    const links = wrapper.findAll('a')
    expect(links.length).toBeGreaterThanOrEqual(7) // first + prev + pages + next + last
    links.forEach(link => {
      expect(link.attributes('role')).toBe('button')
    })
  })

  it('affiche la page courante avec aria-current', () => {
    const wrapper = mount(DsfrCustomPagination, {
      props: { pages, currentPage: 2 }
    })
    const currentPage = wrapper.find('[aria-current="page"]')
    expect(currentPage.exists()).toBe(true)
    expect(currentPage.text()).toContain('3') // page 3 (index 2)
  })

  it('emmet update:current-page au clique sur une page', async () => {
    const wrapper = mount(DsfrCustomPagination, {
      props: { pages, currentPage: 0 }
    })
    const pageLinks = wrapper.findAll('.fr-unhidden-lg')
    await pageLinks[1].trigger('click')
    expect(wrapper.emitted('update:current-page')).toBeTruthy()
    expect(wrapper.emitted('update:current-page')[0][0]).toBe(1)
  })

  it('emmet update:current-page pour page suivante', async () => {
    const wrapper = mount(DsfrCustomPagination, {
      props: { pages, currentPage: 0 }
    })
    const nextLink = wrapper.find('.fr-pagination__link--next')
    await nextLink.trigger('click')
    expect(wrapper.emitted('update:current-page')).toBeTruthy()
    expect(wrapper.emitted('update:current-page')[0][0]).toBe(1)
  })

  it('emmet update:current-page pour page precedente', async () => {
    const wrapper = mount(DsfrCustomPagination, {
      props: { pages, currentPage: 2 }
    })
    const prevLink = wrapper.find('.fr-pagination__link--prev')
    await prevLink.trigger('click')
    expect(wrapper.emitted('update:current-page')).toBeTruthy()
    expect(wrapper.emitted('update:current-page')[0][0]).toBe(1)
  })

  it('emmet update:current-page pour premiere page', async () => {
    const wrapper = mount(DsfrCustomPagination, {
      props: { pages, currentPage: 3 }
    })
    const firstLink = wrapper.find('.fr-pagination__link--first')
    await firstLink.trigger('click')
    expect(wrapper.emitted('update:current-page')).toBeTruthy()
    expect(wrapper.emitted('update:current-page')[0][0]).toBe(0)
  })

  it('emmet update:current-page pour derniere page', async () => {
    const wrapper = mount(DsfrCustomPagination, {
      props: { pages, currentPage: 0 }
    })
    const lastLink = wrapper.find('.fr-pagination__link--last')
    await lastLink.trigger('click')
    expect(wrapper.emitted('update:current-page')).toBeTruthy()
    expect(wrapper.emitted('update:current-page')[0][0]).toBe(4)
  })

  it('desactive premiere page et precedente quand currentPage = 0', () => {
    const wrapper = mount(DsfrCustomPagination, {
      props: { pages, currentPage: 0 }
    })
    const firstLink = wrapper.find('.fr-pagination__link--first')
    const prevLink = wrapper.find('.fr-pagination__link--prev')
    expect(firstLink.attributes('aria-disabled')).toBe('true')
    expect(firstLink.classes()).toContain('fr-pagination__link--disabled')
    expect(prevLink.attributes('aria-disabled')).toBe('true')
    expect(prevLink.classes()).toContain('fr-pagination__link--disabled')
  })

  it('desactive derniere page et suivante quand currentPage = dernier', () => {
    const wrapper = mount(DsfrCustomPagination, {
      props: { pages, currentPage: 4 }
    })
    const lastLink = wrapper.find('.fr-pagination__link--last')
    const nextLink = wrapper.find('.fr-pagination__link--next')
    expect(lastLink.attributes('aria-disabled')).toBe('true')
    expect(lastLink.classes()).toContain('fr-pagination__link--disabled')
    expect(nextLink.attributes('aria-disabled')).toBe('true')
    expect(nextLink.classes()).toContain('fr-pagination__link--disabled')
  })

  it('ne clique pas sur premiere page quand desactive', async () => {
    const wrapper = mount(DsfrCustomPagination, {
      props: { pages, currentPage: 0 }
    })
    const firstLink = wrapper.find('.fr-pagination__link--first')
    await firstLink.trigger('click')
    expect(wrapper.emitted('update:current-page')).toBeFalsy()
  })

  it('utilise les titres personnalisés pour les boutons', () => {
    const wrapper = mount(DsfrCustomPagination, {
      props: {
        pages,
        currentPage: 0,
        firstPageTitle: 'Première',
        lastPageTitle: 'Dernière',
        nextPageTitle: 'Suivante',
        prevPageTitle: 'Précédente'
      }
    })
    expect(wrapper.find('.fr-pagination__link--first').attributes('title')).toBe('Première')
    expect(wrapper.find('.fr-pagination__link--prev').text()).toBe('Précédente')
    expect(wrapper.find('.fr-pagination__link--next').text()).toBe('Suivante')
    expect(wrapper.find('.fr-pagination__link--last').attributes('title')).toBe('Dernière')
  })

  it('trunqe les pages quand il y en a trop', () => {
    const manyPages = Array.from({ length: 20 }, (_, i) => ({
      label: `${i + 1}`,
      title: `Page ${i + 1}`,
      href: `/page/${i}`
    }))
    const wrapper = mount(DsfrCustomPagination, {
      props: { pages: manyPages, currentPage: 0, truncLimit: 5 }
    })
    const pageLinks = wrapper.findAll('.fr-unhidden-lg')
    expect(pageLinks.length).toBeLessThanOrEqual(7) // 5 + prev + next
  })

  it('affiche les liens de premier et dernier avec spans sr-only', () => {
    const wrapper = mount(DsfrCustomPagination, {
      props: { pages, currentPage: 0 }
    })
    const firstLink = wrapper.find('.fr-pagination__link--first')
    const lastLink = wrapper.find('.fr-pagination__link--last')
    expect(firstLink.find('.fr-sr-only').exists()).toBe(true)
    expect(lastLink.find('.fr-sr-only').exists()).toBe(true)
  })
})