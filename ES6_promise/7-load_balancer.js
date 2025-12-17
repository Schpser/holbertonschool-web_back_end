export default async function loadBalancer(chinaDownload, USDownload) {
  const results = await Promise.race([chinaDownload, USDownload]);
  return results;
}
