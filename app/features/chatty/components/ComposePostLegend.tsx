import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import styles from './ComposePostLegend.css';

type Props = {
  onSelect?: (tag: string | null) => void;
};

export default function ComposePostLegend(props: Props) {
  const { onSelect } = props;

  return (
    <Dropdown as={ButtonGroup} onSelect={onSelect}>
      <Dropdown.Toggle>Shack Tags Legend</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item id="red" eventKey="r{...}r">
          <div className={styles.item}>
            <div className="jt_red">red</div>
            <div className={styles.legend}>{'r{...}r'}</div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item id="green" eventKey="g{...}g">
          <div className={styles.item}>
            <div className="jt_green">green</div>
            <div className={styles.legend}>{'g{...}g'}</div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item id="blue" eventKey="b{...}b">
          <div className={styles.item}>
            <div className="jt_blue">blue</div>
            <div className={styles.legend}>{'b{...}b'}</div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item id="yellow" eventKey="y{...}y">
          <div className={styles.item}>
            <div className="jt_yellow">yellow</div>
            <div className={styles.legend}>{'y{...}y'}</div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item id="limegreen" eventKey="l{...}l">
          <div className={styles.item}>
            <div className="jt_lime">limegreen</div>
            <div className={styles.legend}>{'l{...}l'}</div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item id="orange" eventKey="n{...}n">
          <div className={styles.item}>
            <div className="jt_orange">orange</div>
            <div className={styles.legend}>{'n{...}n'}</div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item id="multisync" eventKey="p{...}p">
          <div className={styles.item}>
            <div className="jt_pink">multisync</div>
            <div className={styles.legend}>{'p{...}p'}</div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item id="olive" eventKey="e{...}e">
          <div className={styles.item}>
            <div className="jt_olive">olive</div>
            <div className={styles.legend}>{'e{...}e'}</div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item id="italics" eventKey="/[...]/">
          <div className={styles.item}>
            <div className="jt_italic">italics</div>
            <div className={styles.legend}>/[...]/</div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item id="bold" eventKey="b[...]b">
          <div className={styles.item}>
            <div className="jt_bold">bold</div>
            <div className={styles.legend}>b[...]b</div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item id="quote" eventKey="q[...]q">
          <div className={styles.item}>
            <div className="jt_quote">quote</div>
            <div className={styles.legend}>q[...]q</div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item id="sample" eventKey="s[...]s">
          <div className={styles.item}>
            <div className="jt_sample">sample</div>
            <div className={styles.legend}>s[...]s</div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item id="underline" eventKey="_[...]_">
          <div className={styles.item}>
            <div className="jt_underline">underline</div>
            <div className={styles.legend}>_[...]_</div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item id="strike" eventKey="-[...]-">
          <div className={styles.item}>
            <div className="jt_strike">strike</div>
            <div className={styles.legend}>-[...]-</div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item id="spoiler" eventKey="o[...]o">
          <div className={styles.item}>
            <span>s</span>
            <div className="jt_spoiler">poiler</div>
            <div className={styles.legend}>o[...]o</div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item id="code" eventKey="/{{...}}/">
          <div className={styles.item}>
            <div className="jt_code">code</div>
            <div className={styles.legend}>{'/{{...}}/'}</div>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
