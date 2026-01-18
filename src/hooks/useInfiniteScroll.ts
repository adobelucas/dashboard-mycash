import { useEffect, useRef, useState } from 'react'

export interface UseInfiniteScrollOptions {
  threshold?: number
  rootMargin?: string
}

export function useInfiniteScroll<T>(
  items: T[],
  pageSize: number = 10,
  options: UseInfiniteScrollOptions = {}
) {
  const [displayedItems, setDisplayedItems] = useState<T[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const totalPages = Math.ceil(items.length / pageSize)
  const hasMore = currentPage < totalPages

  useEffect(() => {
    const endIndex = currentPage * pageSize
    setDisplayedItems(items.slice(0, endIndex))
  }, [items, currentPage, pageSize])

  useEffect(() => {
    if (!hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prev) => prev + 1)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '100px',
      }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, options])

  const reset = () => {
    setCurrentPage(1)
    setDisplayedItems([])
  }

  return {
    displayedItems,
    hasMore,
    loadMoreRef,
    reset,
  }
}
