import { Dropdown, DropdownValue } from './Dropdown/Dropdown';
import './App.css';

function App() {
  const initialData: DropdownValue[] = [
    { value: 'item1', text: 'React' },
    { value: 'item2', text: 'TypeScript' },
    { value: 'item3', text: 'Ruby' },
    { value: 'item4', text: 'React Native' },
    { value: 'item5', text: 'Flutter' },
  ];

  const customAsyncSearch = async (query: string): Promise<DropdownValue[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = initialData.filter((item) =>
          item.text.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 1000);
    });
  };

  const renderCustomOption = (option: DropdownValue) => (
    <div>
      <strong>{option.text}</strong> (value: {option.value})
    </div>
  );

  const renderCustomSelected = (selected: DropdownValue | null) => (
    <div style={{ fontWeight: 'bold', color: 'green' }}>
      {selected ? selected.text : 'Choose an option'}
    </div>
  );

  return (
    <div className="app">
      <h1>Dropdown Component Demo</h1>

      <h2>Basic Dropdown</h2>
      <Dropdown data={initialData} />

      <h2>Dropdown with Custom Rendering</h2>
      <Dropdown
        data={initialData}
        renderOption={renderCustomOption}
        renderSelected={renderCustomSelected}
      />

      <h2>Dropdown with Async Search</h2>
      <Dropdown
        data={initialData}
        onSearch={customAsyncSearch}
        renderSelected={(selected) => (
          <div>{selected ? selected.text : 'Search and select...'}</div>
        )}
      />
    </div>
  );
}

export default App;
