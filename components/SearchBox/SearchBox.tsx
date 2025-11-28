import css from './SearchBox.module.css';

interface SearchBoxProps {
  search: string;
  onChange: (searchS: string) => void;
}

export default function SearchBox({ search, onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={(e) => {
        onChange(e.target.value);
      }}
      onFocus={(e) => {
        e.target.value = '';
      }}
      defaultValue={search}
    />
  );
}
