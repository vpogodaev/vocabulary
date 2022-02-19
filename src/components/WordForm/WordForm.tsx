import React, { FormEvent, FormEventHandler, useState } from 'react';
import styles from './WordForm.module.scss';

declare type TWordFormProps = {
  onFormSubmit: (flv: string, slv: string) => void;
};

const WordForm: React.FC<TWordFormProps> = ({onFormSubmit}): JSX.Element => {
  const [firstLanguageValue, setFirstLanguageValue] = useState('');
  const [secondLanguageValue, setSecondLanguageValue] = useState('');

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    onFormSubmit(firstLanguageValue, secondLanguageValue);

    setFirstLanguageValue('');
    setSecondLanguageValue('');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, set: React.Dispatch<React.SetStateAction<string>>) => {
    set(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <label>
          <span>Слово:</span>
          <input type="text"
                 value={firstLanguageValue}
                 onChange={e => onChange(e, setFirstLanguageValue)} />
        </label>
        <label>
          <span>Перевод:</span>
          <input type="text"
                 value={secondLanguageValue}
                 onChange={e => onChange(e, setSecondLanguageValue)} />
        </label>
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default WordForm;