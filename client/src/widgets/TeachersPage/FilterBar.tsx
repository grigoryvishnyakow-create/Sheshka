import { FilterBar, FilterChip } from "./styles";

interface Props {
  departments: string[];
  active: string;
  onChange: (val: string) => void;
}

const Filters = ({ departments, active, onChange }: Props) => (
  <FilterBar>
    {departments.map((d, i) => (
      <FilterChip key={i} active={active === d} onClick={() => onChange(d)}>
        {d === "all" ? "Все" : d}
      </FilterChip>
    ))}
  </FilterBar>
);

export default Filters;
