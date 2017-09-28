function link(value) {
  let url = value;
  const protocolRegex = /^http(s)?:\/\//;
  const trailingSlashRegex = /\/$/;

  if (protocolRegex.test(url)) {
    url = url.replace(protocolRegex, '');
  }

  if (trailingSlashRegex.test(url)) {
    url = url.replace(trailingSlashRegex, '');
  }

  return url;
}


export default link;
