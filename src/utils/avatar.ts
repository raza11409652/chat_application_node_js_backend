const colors = [
  '5dd39e',
  '348aa7',
  '525174',
  '513b56',
  'ffe74c',
  'ff5964',
  '38618c',
  '35a7ff',
  'DB5461',
  'E3655B',
];
export const getAvatarColor = () => {
  const index = Math.round(Math.random() * colors.length);
  return `#${colors[index]}` || '#DDDDDD';
};
