import React, { useEffect, useState } from 'react';
import { FrontUserFAQsService } from 'services';
import CollapseBox from 'components/Common/CollapseBox';
import ReactHtmlParser from 'react-html-parser';
import PlainText from 'components/Common/PlainText';

import './style.scss';

export default function FAQsBox({ successCallback = () => {} }) {
  const [faqs, setFAQs] = useState([]);
  const getFAQs = () => {
    FrontUserFAQsService.getFAQs({}, response => {
      const activatedFAQs = FrontUserFAQsService.getActivatedFAQs(response.items);
      setFAQs(activatedFAQs);
      successCallback({ activatedFAQs });
    })
  }

  useEffect(() => {
    getFAQs();
    // eslint-disable-next-line
  }, []);

  const items = faqs.map(faq => ({
    header: faq.question,
    text: <PlainText type="TextArea">{ReactHtmlParser(faq.answer)}</PlainText>,
  }))

  return (
    <CollapseBox items={items} accordion />
  )
}
