import type { Translations } from './types';
import { en } from './en';

const extraCommon = { logout: en.common.logout, days: en.common.days, allowed: en.common.allowed, notAllowed: en.common.notAllowed, conditional: en.common.conditional, ready: en.common.ready, notFound: en.common.notFound, strength: en.common.strength, match: en.common.match, matchScore: en.common.matchScore, processing: en.common.processing };
const extraLanding = { login: en.landing.login };
const extraClient = { coActor: en.client.coActor, teamMember: en.client.teamMember, universe: en.client.universe, agency: en.client.agency, similarStyle: en.client.similarStyle, frequentCollab: en.client.frequentCollab, networkDesc: en.client.networkDesc, teamsDesc: en.client.teamsDesc, universesDesc: en.client.universesDesc, autoCastDesc: en.client.autoCastDesc, network: en.client.network, teamsAndUniverses: en.client.teamsAndUniverses, noConnections: en.client.noConnections, idolGroup: en.client.idolGroup, dramaCast: en.client.dramaCast, brandAmbassadors: en.client.brandAmbassadors, customTeam: en.client.customTeam, leadActor: en.client.leadActor, supportingActor: en.client.supportingActor, sideCharacter: en.client.sideCharacter, selectPurpose: en.client.selectPurpose, purposeRequired: en.client.purposeRequired, selectAsset: en.client.selectAsset, regionRequired: en.client.regionRequired, selectChannel: en.client.selectChannel, minFee: en.client.minFee, backTo: en.client.backTo, startingAt: en.client.startingAt, avgApproval: en.client.avgApproval };
const extraViewMode = { viewAsUser: en.viewMode.viewAsUser, viewingAsUser: en.viewMode.viewingAsUser, restoreAdmin: en.viewMode.restoreAdmin };

export function withDefaults(partial: any): Translations {
  return {
    ...partial,
    common: { ...extraCommon, ...partial.common },
    landing: { ...extraLanding, ...partial.landing },
    client: { ...extraClient, ...partial.client },
    viewMode: partial.viewMode || extraViewMode,
  };
}
