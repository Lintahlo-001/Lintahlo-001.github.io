const REQUIRED_TEXT = ['id', 'name', 'issuer', 'date', 'image', 'credentialUrl'];

const isTodo = (value) => typeof value === 'string' && value.trim().startsWith('TODO');

export function findCertProblems(certs) {
  const errors = [];
  const warnings = [];
  const seenIds = new Set();

  certs.forEach((cert, index) => {
    const label = cert.id || cert.name || `cert #${index + 1}`;

    if (seenIds.has(cert.id)) errors.push(`${label}: duplicate id`);
    seenIds.add(cert.id);

    REQUIRED_TEXT.forEach((key) => {
      const value = cert[key];
      if (!value || !String(value).trim()) errors.push(`${label}: "${key}" is empty`);
      else if (isTodo(value)) warnings.push(`${label}: "${key}" is still a TODO`);
    });

    const url = cert.credentialUrl;
    if (url && !isTodo(url) && !String(url).startsWith('https://')) {
      errors.push(`${label}: credentialUrl must start with https://`);
    }
  });

  return { errors, warnings };
}
