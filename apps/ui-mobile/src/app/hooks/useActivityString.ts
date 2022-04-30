export const useActivityString = (activity: String) => {
  // changes enum names to better looking
  return activity[0].toUpperCase() + activity.slice(1).replace('_', ' ');
};
