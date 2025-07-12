import type { TalentData } from "../types";
import { arms } from "./warrior/arms";
import { fury } from "./warrior/fury";
import { protection } from "./warrior/protection";

export const talentData: TalentData = {
  warrior: [ arms, fury, protection ],
  paladin: [],
  hunter: [],
  rogue: [],
  priest: [],
  shaman: [],
  mage: [],
  warlock: [],
  druid: []
};