import { profile } from './data/profile.js';
import { navItems } from './data/nav.js';
import { projects } from './data/projects.js';

export default function App() {
  return (
    <main>
      <h1>{profile.name}</h1>
      <p>{profile.tagline}</p>
      <p>{profile.roleLine}</p>
      <ul>
        {navItems.map((item) => (
          <li key={item.id}>{item.label}</li>
        ))}
      </ul>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.name}: {project.summary}
          </li>
        ))}
      </ul>
    </main>
  );
}