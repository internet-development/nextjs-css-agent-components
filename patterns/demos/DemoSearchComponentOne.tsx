import styles from '@patterns/demos/DemoSearchComponentOne.module.css';

import * as React from 'react';

import ActionItem from '@elements/marks/ActionItem';
import Focus from '@elements/icons/Focus';
import Plus from '@elements/icons/Plus';
import Globe from '@elements/icons/Globe';
import Search from '@elements/icons/Search';

export default function DemoSearchComponentOne(props) {
  return (
    <div className={styles.root}>
      <div className={styles.layout}>
        <div className={styles.container}>
          <input className={styles.input} placeholder="Search social" />
          <span className={styles.absoluteButton}>
            <span className={styles.roundButton}>
              <Search height="24px" />
            </span>
          </span>
        </div>
        <div className={styles.footer}>
          <ul className={styles.actions}>
            <li className={styles.item}>
              <span className={styles.icon}>
                <Plus height="14px" />
              </span>
              <span className={styles.words}>Attach</span>
            </li>
            <li className={styles.item}>
              <span className={styles.icon}>
                <Focus height="16px" />
              </span>
              <span className={styles.words}>Focus on social</span>
            </li>
            <li className={styles.item}>
              <span className={styles.icon}>
                <Globe height="16px" />
              </span>
              <span className={styles.words}>Discover</span>
            </li>
          </ul>
          <ul className={styles.history}>
            <li className={styles.record}>
              Yesterday, you searched for{' '}
              <a href="#" className={styles.link}>
                “What is the perfect dog food?”
              </a>{' '}
              We found{' '}
              <a href="#" className={styles.link}>
                4,288 relevant results
              </a>
              , and today we’ve discovered{' '}
              <a href="#" className={styles.link}>
                24 more
              </a>
              . We have a question for you,{' '}
              <a href="#" className={styles.link}>
                what kind of dog do you have?
              </a>
            </li>
            <li className={styles.record}>
              Four days ago, you searched for{' '}
              <a href="#" className={styles.link}>
                “What are the perfect flowers for an 8th anniversary?”
              </a>{' '}
              We found{' '}
              <a href="#" className={styles.link}>
                18 relevant results
              </a>
              , and two days ago we’ve discovered{' '}
              <a href="#" className={styles.link}>
                one more
              </a>{' '}
              based on your region.
            </li>
            <li className={styles.record}>
              Three weeks ago, you searched for{' '}
              <a href="#" className={styles.link}>
                “Help me design a perfect cabin”
              </a>{' '}
              We found{' '}
              <a href="#" className={styles.link}>
                228 relevant results
              </a>
              , and yesterday we've discovered{' '}
              <a href="#" className={styles.link}>
                6 more
              </a>
              .
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
