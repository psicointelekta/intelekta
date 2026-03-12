"use client"

/**
 * Decorative SVG elements that reference neuroscience motifs.
 * Pure SVG — zero JS, zero performance cost.
 * Used as subtle background fills in sections.
 */

// --- NeuronDots: Mini neural graph — circles connected by thin lines ---
export function NeuronDots({
    className = "",
    width = 280,
    height = 220,
    color = "var(--primary)",
    opacity = 0.04,
}: {
    className?: string
    width?: number
    height?: number
    color?: string
    opacity?: number
}) {
    const nodes = [
        { cx: 45, cy: 35 }, { cx: 110, cy: 22 }, { cx: 175, cy: 50 },
        { cx: 240, cy: 28 }, { cx: 30, cy: 95 }, { cx: 85, cy: 80 },
        { cx: 155, cy: 105 }, { cx: 220, cy: 88 }, { cx: 265, cy: 70 },
        { cx: 55, cy: 155 }, { cx: 130, cy: 145 }, { cx: 195, cy: 165 },
        { cx: 250, cy: 140 }, { cx: 70, cy: 200 }, { cx: 160, cy: 210 },
        { cx: 230, cy: 195 },
    ]
    const edges = [
        [0, 1], [1, 2], [2, 3], [0, 4], [0, 5], [1, 5], [2, 6], [2, 7],
        [3, 7], [3, 8], [4, 5], [5, 6], [6, 7], [7, 8], [4, 9], [5, 10],
        [6, 10], [6, 11], [7, 12], [9, 10], [10, 11], [11, 12], [9, 13],
        [10, 14], [11, 14], [11, 15], [12, 15], [13, 14], [14, 15],
    ]

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className={className}
            aria-hidden="true"
            style={{ opacity }}
        >
            {/* Connections */}
            {edges.map(([a, b], i) => (
                <line
                    key={`e${i}`}
                    x1={nodes[a].cx}
                    y1={nodes[a].cy}
                    x2={nodes[b].cx}
                    y2={nodes[b].cy}
                    stroke={color}
                    strokeWidth="1"
                    strokeOpacity="0.6"
                />
            ))}
            {/* Nodes */}
            {nodes.map((n, i) => (
                <circle
                    key={`n${i}`}
                    cx={n.cx}
                    cy={n.cy}
                    r={i % 3 === 0 ? 4 : 2.5}
                    fill={color}
                    fillOpacity={i % 3 === 0 ? "0.8" : "0.5"}
                />
            ))}
        </svg>
    )
}

// --- HexGrid: Partial hexagonal grid — molecular/cellular reference ---
export function HexGrid({
    className = "",
    width = 300,
    height = 260,
    color = "var(--primary)",
    opacity = 0.03,
}: {
    className?: string
    width?: number
    height?: number
    color?: string
    opacity?: number
}) {
    const hexSize = 28
    const hexHeight = hexSize * Math.sqrt(3)
    const hexWidth = hexSize * 2
    const cols = Math.ceil(width / (hexWidth * 0.75)) + 1
    const rows = Math.ceil(height / hexHeight) + 1

    const hexPoints = (cx: number, cy: number, size: number) => {
        const pts = []
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6
            pts.push(`${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`)
        }
        return pts.join(" ")
    }

    const hexagons: { cx: number; cy: number; visible: boolean }[] = []
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cx = col * hexWidth * 0.75
            const cy = row * hexHeight + (col % 2 === 1 ? hexHeight / 2 : 0)
            // Fade out toward edges — only show ~60% of hexagons for organic feel
            const distFromCenter = Math.sqrt(
                Math.pow((cx - width / 2) / (width / 2), 2) +
                Math.pow((cy - height / 2) / (height / 2), 2)
            )
            const visible = distFromCenter < 1.1 && Math.random() > 0.35
            hexagons.push({ cx, cy, visible })
        }
    }

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className={className}
            aria-hidden="true"
            style={{ opacity }}
        >
            {hexagons
                .filter((h) => h.visible)
                .map((h, i) => (
                    <polygon
                        key={i}
                        points={hexPoints(h.cx, h.cy, hexSize * 0.9)}
                        fill="none"
                        stroke={color}
                        strokeWidth="0.8"
                        strokeOpacity={0.4 + Math.random() * 0.4}
                    />
                ))}
        </svg>
    )
}

// --- SynapseArcs: Curved arcs referencing neural pathways ---
export function SynapseArcs({
    className = "",
    width = 320,
    height = 200,
    color = "var(--primary)",
    opacity = 0.035,
}: {
    className?: string
    width?: number
    height?: number
    color?: string
    opacity?: number
}) {
    const arcs = [
        "M 20,180 Q 80,20 160,90",
        "M 60,190 Q 130,50 220,120",
        "M 100,195 Q 180,40 280,85",
        "M 10,140 Q 60,60 130,100",
        "M 150,185 Q 220,30 310,80",
        "M 40,160 Q 110,80 200,140",
        "M 180,190 Q 250,60 300,120",
    ]

    const dots = [
        { cx: 20, cy: 180 }, { cx: 160, cy: 90 },
        { cx: 60, cy: 190 }, { cx: 220, cy: 120 },
        { cx: 280, cy: 85 }, { cx: 130, cy: 100 },
        { cx: 310, cy: 80 }, { cx: 200, cy: 140 },
        { cx: 300, cy: 120 }, { cx: 180, cy: 190 },
    ]

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className={className}
            aria-hidden="true"
            style={{ opacity }}
        >
            {arcs.map((d, i) => (
                <path
                    key={`a${i}`}
                    d={d}
                    fill="none"
                    stroke={color}
                    strokeWidth="1.2"
                    strokeOpacity={0.3 + (i % 3) * 0.15}
                    strokeLinecap="round"
                />
            ))}
            {dots.map((dot, i) => (
                <circle
                    key={`d${i}`}
                    cx={dot.cx}
                    cy={dot.cy}
                    r={i % 2 === 0 ? 3.5 : 2}
                    fill={color}
                    fillOpacity={i % 2 === 0 ? "0.7" : "0.4"}
                />
            ))}
        </svg>
    )
}

// --- MolecularBonds: Ring + branch structure — cognitive chemistry feel ---
export function MolecularBonds({
    className = "",
    width = 240,
    height = 240,
    color = "var(--primary)",
    opacity = 0.03,
}: {
    className?: string
    width?: number
    height?: number
    color?: string
    opacity?: number
}) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 240 240"
            className={className}
            aria-hidden="true"
            style={{ opacity }}
        >
            {/* Central hexagonal ring */}
            <polygon
                points="120,60 165,90 165,150 120,180 75,150 75,90"
                fill="none"
                stroke={color}
                strokeWidth="1.2"
                strokeOpacity="0.5"
            />
            {/* Branches */}
            <line x1="120" y1="60" x2="120" y2="20" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
            <line x1="165" y1="90" x2="205" y2="70" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
            <line x1="165" y1="150" x2="205" y2="170" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
            <line x1="120" y1="180" x2="120" y2="220" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
            <line x1="75" y1="150" x2="35" y2="170" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
            <line x1="75" y1="90" x2="35" y2="70" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
            {/* Vertices */}
            {[
                [120, 60], [165, 90], [165, 150], [120, 180], [75, 150], [75, 90],
                [120, 20], [205, 70], [205, 170], [120, 220], [35, 170], [35, 70],
            ].map(([cx, cy], i) => (
                <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={i < 6 ? 4 : 2.5}
                    fill={color}
                    fillOpacity={i < 6 ? "0.6" : "0.35"}
                />
            ))}
        </svg>
    )
}
