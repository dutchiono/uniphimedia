import type {
  PlacedRoom,
  SystemsValidationResult,
  ValidationIssue,
} from '@uniphimedia/shared-types';
import { getRoomModule } from '@uniphimedia/room-modules';

let _issueCounter = 0;
function issueId() { return `issue_${++_issueCounter}`; }

export function validateSystems(rooms: PlacedRoom[]): SystemsValidationResult {
  const issues: ValidationIssue[] = [];
  let totalElectricalWatts = 0;
  let totalHvacCfm = 0;
  let totalPlumbingFixtures = 0;

  // Tally loads
  for (const room of rooms) {
    const mod = getRoomModule(room.moduleId);
    if (!mod) continue;
    for (const node of mod.systemsNodes) {
      if (node.watts)  totalElectricalWatts += node.watts;
      if (node.cfm)    totalHvacCfm += node.cfm;
      if (node.gpm)    totalPlumbingFixtures += 1;
    }
  }

  // Rule: at least one kitchen
  const hasKitchen = rooms.some(r => getRoomModule(r.moduleId)?.category === 'kitchen');
  if (!hasKitchen) {
    issues.push({
      id: issueId(), severity: 'error', channel: 'plumbing-supply',
      affectedRooms: [], message: 'No kitchen found. A kitchen is required.',
      suggestion: 'Add a kitchen module to the floor plan.',
    });
  }

  // Rule: at least one full bathroom
  const hasFullBath = rooms.some(r => getRoomModule(r.moduleId)?.id === 'bathroom_full');
  if (!hasFullBath) {
    issues.push({
      id: issueId(), severity: 'error', channel: 'plumbing-drain',
      affectedRooms: [], message: 'No full bathroom found.',
      suggestion: 'Add at least one full bathroom.',
    });
  }

  // Rule: stairwell must exist if there are rooms on multiple levels
  const levels = new Set(rooms.map(r => r.level));
  if (levels.size > 1) {
    const hasStair = rooms.some(r => getRoomModule(r.moduleId)?.category === 'stairwell');
    if (!hasStair) {
      issues.push({
        id: issueId(), severity: 'error', channel: 'structural',
        affectedRooms: rooms.map(r => r.instanceId),
        message: 'Multi-level design has no stairwell.',
        suggestion: 'Add a stairwell module connecting all occupied levels.',
      });
    }
  }

  // Rule: validate all room connections
  for (const room of rooms) {
    for (const conn of room.connections) {
      if (!conn.valid) {
        issues.push({
          id: issueId(), severity: 'warning', channel: 'structural',
          affectedRooms: [room.instanceId, conn.toInstanceId],
          message: `Connection issue between rooms: ${conn.warnings.join('; ')}`,
          suggestion: 'Review room placement and connector alignment.',
        });
      }
    }
  }

  // Rule: electrical load warning > 15000W
  if (totalElectricalWatts > 15000) {
    issues.push({
      id: issueId(), severity: 'warning', channel: 'electrical-120v',
      affectedRooms: [], message: `Total electrical load ${totalElectricalWatts}W exceeds 15kW — consider a 200A panel.`,
      suggestion: 'Add a sub panel in garage or utility room.',
    });
  }

  // Rule: HVAC CFM check
  if (totalHvacCfm > 0 && totalHvacCfm < 200) {
    issues.push({
      id: issueId(), severity: 'info', channel: 'hvac-supply',
      affectedRooms: [], message: `Low total HVAC CFM (${totalHvacCfm}). Verify system sizing.`,
      suggestion: 'A typical home needs 1 CFM per sq ft. Check room counts.',
    });
  }

  return {
    valid: issues.filter(i => i.severity === 'error').length === 0,
    issues,
    totalElectricalWatts,
    totalHvacCfm,
    totalPlumbingFixtures,
  };
}
