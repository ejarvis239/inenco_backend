exports.formatSiteData = (siteData, ownerDocs) => {
  return siteData.map((site) => {
    return {
      ...site,
      owner: ownerDocs.find(owner => site.owner === owner.username)._id
    };
  });
};