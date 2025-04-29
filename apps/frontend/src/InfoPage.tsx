import { AboutPage } from './AboutPage/Aboutpage.tsx';
import { CreditPage } from './CreditPage/CreditPage.tsx';

export default function CombinedPage() {
  return (
    <>
      {/*Courtesy of Camden B.*/}
      <CreditPage />
      {/*Courtesy of Ethan R.*/}
      <AboutPage />
    </>
  );
}
