"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { feature } from "topojson-client"

// Dados simulados de pontos (latitude, longitude)
const simulatedPoints = [
  { lat: 40.7128, lng: -74.006 }, // Nova York
  { lat: 51.5074, lng: -0.1278 }, // Londres
  { lat: 48.8566, lng: 2.3522 }, // Paris
  { lat: 35.6762, lng: 139.6503 }, // Tóquio
  { lat: -33.8688, lng: 151.2093 }, // Sydney
  { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro
  { lat: 55.7558, lng: 37.6173 }, // Moscou
  { lat: 1.3521, lng: 103.8198 }, // Singapura
  { lat: 25.2048, lng: 55.2708 }, // Dubai
  { lat: -1.2921, lng: 36.8219 }, // Nairobi
  { lat: 37.7749, lng: -122.4194 }, // São Francisco
  { lat: 19.4326, lng: -99.1332 }, // Cidade do México
  { lat: 41.9028, lng: 12.4964 }, // Roma
  { lat: 31.2304, lng: 121.4737 }, // Xangai
  { lat: -34.6037, lng: -58.3816 }, // Buenos Aires
]

interface WorldMapProps {
  isDarkMode: boolean
  playHoverSound: () => void
  playClickSound: () => void
}

export default function WorldMap({ isDarkMode, playHoverSound, playClickSound }: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const fetchData = async () => {
      try {
        // Carregar dados do mapa mundial
        const response = await fetch("https://unpkg.com/world-atlas@2.0.2/countries-110m.json")
        const data = await response.json()

        // Converter TopoJSON para GeoJSON
        const countries = feature(data, data.objects.countries)

        renderMap(countries)
      } catch (error) {
        console.error("Erro ao carregar dados do mapa:", error)
      }
    }

    fetchData()
  }, [isDarkMode])

  const renderMap = (countries: any) => {
    const svg = d3.select(svgRef.current)
    const width = svgRef.current!.clientWidth
    const height = svgRef.current!.clientHeight

    // Limpar SVG
    svg.selectAll("*").remove()

    // Configurar projeção
    const projection = d3.geoEquirectangular().fitSize([width, height], countries)

    const path = d3.geoPath().projection(projection)

    // Criar grupo para zoom
    const g = svg.append("g")

    // Desenhar países
    g.selectAll("path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("d", (d) => path(d as d3.GeoPermissibleObjects)!)
    .attr("fill", "#000")
    .attr("stroke", "#333333")
    .attr("stroke-width", 0.5)
  

    // Adicionar pontos
    g.selectAll("circle")
      .data(simulatedPoints)
      .enter()
      .append("circle")
      .attr("cx", (d) => projection([d.lng, d.lat])![0])
      .attr("cy", (d) => projection([d.lng, d.lat])![1])
      .attr("r", 4)
      .attr("fill", "#3b82f6") // Pontos azuis
      .attr("opacity", 0.8)
      .append("title")
      .text((d) => `Lat: ${d.lat}, Lng: ${d.lng}`)

    // Configurar zoom
    const zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform)
      })

    svg.call(zoom as any)
  }

  return (
    <svg
      ref={svgRef}
      className="w-full h-[70vh]"
      viewBox="200 0 1160 700"
      preserveAspectRatio="xMidYMid meet"
      onMouseEnter={playHoverSound}
    />
  )
}
