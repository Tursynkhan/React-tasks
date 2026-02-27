import CompoundMenu from './CompoundMenu';
import CompoundMenuButton from './CompoundMenuButton';
import CompoundMenuContent from './CompoundMenuContent';
import CompoundMenuItem from './CompoundMenuItem';

export {
  CompoundMenu,
  CompoundMenuButton,
  CompoundMenuContent,
  CompoundMenuItem,
};

export default Object.assign(CompoundMenu, {
  Button: CompoundMenuButton,
  Content: CompoundMenuContent,
  Item: CompoundMenuItem,
});
