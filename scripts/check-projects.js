import { projects } from '../src/data/projects.js';
import { findProjectProblems } from '../src/data/checkProjects.js';

const { errors, warnings } = findProjectProblems(projects);

warnings.forEach((msg) => console.warn(`WARN  ${msg}`));
errors.forEach((msg) => console.error(`ERROR ${msg}`));

if (errors.length) {
  console.error(`\n${errors.length} project data error(s). Fix them before building.`);
  process.exit(1);
}
console.log(`Project data OK (${projects.length} projects).`);