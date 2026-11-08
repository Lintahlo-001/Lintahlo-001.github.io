const REQUIRED_TEXT = ['id', 'name', 'summary', 'description', 'role', 'teamSize'];

const isTodo = (value) => typeof value === 'string' && value.trim().startsWith('TODO');

export function findProjectProblems(projects) {
  const errors = [];
  const warnings = [];
  const seenIds = new Set();

  projects.forEach((project, index) => {
    const label = project.id || project.name || `project #${index + 1}`;

    if (seenIds.has(project.id)) errors.push(`${label}: duplicate id`);
    seenIds.add(project.id);

    REQUIRED_TEXT.forEach((key) => {
      const value = project[key];
      if (!value || !String(value).trim()) errors.push(`${label}: "${key}" is empty`);
      else if (isTodo(value)) warnings.push(`${label}: "${key}" is still a TODO`);
    });

    if (!project.stack?.length) errors.push(`${label}: stack is empty`);

    const highlightCount = project.highlights?.length ?? 0;
    if (highlightCount < 3 || highlightCount > 5) {
      errors.push(`${label}: needs 3-5 highlights (has ${highlightCount})`);
    }

    if (!project.links?.length) errors.push(`${label}: needs at least one link`);

    if (!project.screenshots?.length) {
      errors.push(`${label}: has NO screenshots (at least 1 is required)`);
    } else {
      project.screenshots.forEach((shot, i) => {
        if (!shot.src) errors.push(`${label}: screenshot ${i + 1} has no src`);
        if (!shot.alt) errors.push(`${label}: screenshot ${i + 1} has no alt text`);
      });
    }
  });

  return { errors, warnings };
}