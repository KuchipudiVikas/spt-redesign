export default function checkOwnerShip(featuresOwned, productId) {
  if (Array.isArray(featuresOwned)) {
    return featuresOwned.some((feature) => feature.feature_shop === productId);
  } else {
    return false;
  }
}
