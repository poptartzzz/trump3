'use client'

import { useEffect, useRef } from 'react'
import { createChart, ColorType } from 'lightweight-charts'

interface PriceChartProps {
  data: {
    time: string
    value: number
  }[]
  containerHeight?: number
}

export function PriceChart({ data = [], containerHeight = 300 }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartContainerRef.current || !data || data.length === 0) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#63e211',
      },
      grid: {
        vertLines: { color: '#1a4d1a' },
        horzLines: { color: '#1a4d1a' },
      },
      width: chartContainerRef.current.clientWidth,
      height: containerHeight,
    })

    const lineSeries = chart.addLineSeries({
      color: '#63e211',
      lineWidth: 2,
    })

    const chartData = data.length > 0 ? data : [
      { time: '2024-01-01', value: 0.000001 },
      { time: '2024-01-02', value: 0.000001 }
    ]

    lineSeries.setData(chartData)

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ 
          width: chartContainerRef.current.clientWidth 
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [data, containerHeight])

  return <div ref={chartContainerRef} />
} 