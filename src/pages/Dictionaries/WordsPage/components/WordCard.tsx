import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  IWord,
  PartsOfSpeech,
  TWordValue,
} from '../../../../models/Dictionary/IWord';
import { ElementsList } from '../../../../components/ElementsList/ElementsList';

const TEXT_SECONDARY_WORDS = 'Secondary words';
const TEXT_TRANSLATES = 'Translates';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type TWordCardProps = {
  word: IWord;
};

const WordsList = React.memo(
  ({ words, title }: { words?: TWordValue[]; title: string }) => {
    if (!words || !words.length) {
      return null;
    }

    return (
      <>
        <Typography
          variant="h6"
          component="h3"
        >
          {title}
        </Typography>
        <ElementsList
          elements={words.map((w, i) => ({
            primaryText: w.value,
            id: i.toString(),
          }))}
        />
      </>
    );
  },
);

export const WordCard: React.FC<TWordCardProps> = ({ word }) => {
  const [expanded, setExpanded] = useState(false);

  const title = word.mainWord || word.secondaryWords?.find((w) => w.isMain);
  const mainTranslate = (
    word.translates.find((t) => t.isMain) || word.translates[0]
  ).value;

  const handleExpandClicked = () => {
    setExpanded((pv) => !pv);
  };

  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardHeader
        disableTypography
        title={
          <Typography
            variant="h5"
            component="h2"
          >
            {title}
          </Typography>
        }
        subheader={
          <Typography
            variant="body1"
            component="span"
          >
            {mainTranslate}
          </Typography>
        }
      />
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClicked}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <CardContent>
          <WordsList
            words={word.secondaryWords}
            title={TEXT_SECONDARY_WORDS}
          />
          <WordsList
            words={word.translates}
            title={TEXT_TRANSLATES}
          />
          {word.partOfSpeech !== PartsOfSpeech.empty && (
            <>
              <Typography
                variant="h6"
                component="h3"
              >
                Part of speech
              </Typography>
              <Typography
                variant="body1"
                component="p"
              >
                {word.partOfSpeech}
              </Typography>
            </>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};
