import { projects } from '../src/data/projects.js';
import { certs } from '../src/data/certs.js';
import { findProjectProblems } from '../src/data/checkProjects.js';
import { findCertProblems } from '../src/data/checkCerts.js';

const results = [findProjectProblems(projects), findCertProblems(certs)];
const errors = results.flatMap((r) => r.errors);
const warnings = results.flatMap((r) => r.warnings);

warnings.forEach((msg) => console.warn(`WARN  ${msg}`));
errors.forEach((msg) => console.error(`ERROR ${msg}`));

if (errors.length) {
  console.error(`\n${errors.length} data error(s). Fix them before building.`);
  process.exit(1);
}
console.log(`Data OK (${projects.length} projects, ${certs.length} certs).`);
