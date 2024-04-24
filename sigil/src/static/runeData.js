export const runeData = {
    player: {
        runeMap: [
            // maybe I should add unique ID's to the moves themselves for processing combininations?
            { symbol: "⍫", name: "DEFEND", desc: "reduce damage taken on pairing, completely negate damage from basic attacks" },
            { symbol: "☸", name: "OBSERVE", desc: "predict part of opponents sigil on next turn. leaves vulnerable during pairng." },
            { symbol: "⏆", name: "ATTACK", desc: "utilize voidlink as weapon, cannot break defense" },
            { symbol: "⎉", name: "PREPARE", desc: "vulnerability during pairing, increases effectiveness of subsequent rune" },
            { symbol: "⏣", name: "PROLONG", desc: "repeat previous rune" },
            { symbol: "␥", name: "EVADE", desc: "channce for total damage negation, increases damage taken on evasion fail" },
            { symbol: "☀", name: "HEAL", desc: "recover lost health, leaves vulnerable during pairing" },
            { symbol: "☍", name: "CALL FAMILIAR", desc: "summon familiar or use summoned familiars ability" }
        ],

        maxNumRunes: 8, // could be different from array length if I have some sort of equipt system, this is how many in your ring.
        runesPerMove: 6

    }
}