function parseTagsString(tagsString) {
  const reg = /#([a-zа-я0-9]+)/gi;
  const tags = tagsString.match(reg);

  if (tags) {
    return tags.map(tag => tag.slice(1));
  }

  return [];
}

export default parseTagsString;
