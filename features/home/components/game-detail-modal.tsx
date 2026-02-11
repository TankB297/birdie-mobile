import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { BottomSheetModal } from "@/components/ui/bottom-sheet-modal";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { appTheme } from "@/constants/app-theme";
import { HOME_FALLBACK_COVER_IMAGE_URL } from "@/features/home/constants/home.constants";
import {
  calculateAvailableSlots,
  isGameOpen,
} from "@/features/home/services/home.service";
import type { NearbyGame } from "@/features/home/types/home.types";
import { useI18n } from "@/locales";

type GameDetailModalProps = {
  visible: boolean;
  game: NearbyGame | null;
  onClose: () => void;
};

function formatDistance(distanceKm: number): string {
  return `${distanceKm.toFixed(1)}km`;
}

function formatTimeRange(game: NearbyGame): string {
  return `${game.startTime} - ${game.endTime}`;
}

function getLevelLabelKey(game: NearbyGame): string {
  if (game.level === "advanced") {
    return "home.modal.levelAdvanced";
  }

  if (game.level === "intermediatePlus") {
    return "home.modal.levelIntermediatePlus";
  }

  return "home.modal.levelBeginner";
}

function getFormatLabelKey(game: NearbyGame): string {
  if (game.format === "menOnly") {
    return "home.modal.formatMenOnly";
  }

  if (game.format === "womenOnly") {
    return "home.modal.formatWomenOnly";
  }

  return "home.modal.formatMixed";
}

function formatPriceLabel(
  game: NearbyGame,
  t: (key: string, params?: Record<string, string | number>) => string,
): string {
  if (game.splitEvenly) {
    return t("home.priceSplitEvenly");
  }

  return t("home.priceByGender", {
    male: game.malePriceLabel,
    female: game.femalePriceLabel,
  });
}

export function GameDetailModal({
  visible,
  game,
  onClose,
}: GameDetailModalProps) {
  const { t } = useI18n("vn");
  const [coverImageUri, setCoverImageUri] = useState(HOME_FALLBACK_COVER_IMAGE_URL);

  useEffect(() => {
    if (!game) {
      setCoverImageUri(HOME_FALLBACK_COVER_IMAGE_URL);
      return;
    }

    setCoverImageUri(game.coverImageUrl || HOME_FALLBACK_COVER_IMAGE_URL);
  }, [game]);

  if (!game) {
    return null;
  }

  const openForJoin = isGameOpen(game);
  const availableSlots = calculateAvailableSlots(game);

  return (
    <BottomSheetModal visible={visible} onClose={onClose} horizontalPadding={0}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.coverWrap}>
          <Image
            source={{ uri: coverImageUri }}
            style={styles.coverImage}
            contentFit="cover"
            cachePolicy="memory-disk"
            onError={() => {
              if (coverImageUri !== HOME_FALLBACK_COVER_IMAGE_URL) {
                setCoverImageUri(HOME_FALLBACK_COVER_IMAGE_URL);
              }
            }}
          />
        </View>

        <View style={styles.body}>
          <View style={styles.headerBlock}>
            <Text style={styles.modalTitle}>{t("home.modal.title")}</Text>
            <View style={styles.badgeRow}>
              <Chip label={t(getLevelLabelKey(game))} active variant="filled" />
              <Chip
                label={t(getFormatLabelKey(game))}
                active={false}
                variant="outlined"
              />
            </View>
          </View>

          <View style={styles.infoList}>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={18}
                color={appTheme.colors.warning}
              />
              <Text style={styles.infoLabel}>{t("home.modal.timeLabel")}</Text>
              <Text style={styles.infoValue}>{formatTimeRange(game)}</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="map-marker"
                size={18}
                color={appTheme.colors.accent}
              />
              <Text style={styles.infoLabel}>
                {t("home.modal.locationLabel")}
              </Text>
              <Text
                style={styles.infoValue}
              >{`${game.courtAddress} (${formatDistance(game.distanceKm)})`}</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="account-group-outline"
                size={18}
                color={appTheme.colors.accent}
              />
              <Text style={styles.infoLabel}>{t("home.modal.slotsLabel")}</Text>
              <Text style={styles.infoValue}>
                {openForJoin
                  ? t("home.modal.slotsOpenValue", {
                      available: availableSlots,
                      total: game.totalSlots,
                    })
                  : t("home.modal.slotsClosedValue", { total: game.totalSlots })}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="cash-multiple"
                size={18}
                color={appTheme.colors.warning}
              />
              <Text style={styles.infoLabel}>{t("home.modal.feeLabel")}</Text>
              <Text style={styles.infoValue}>{formatPriceLabel(game, t)}</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="star-outline"
                size={18}
                color={appTheme.colors.warning}
              />
              <Text style={styles.infoLabel}>{t("home.modal.ratingLabel")}</Text>
              <Text style={styles.infoValue}>{game.rating.toFixed(1)}</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <Button
              label={t("home.modal.closeAction")}
              variant="secondary"
              onPress={onClose}
              style={styles.sideAction}
            />
            <Button
              label={
                openForJoin ? t("home.actions.join") : t("home.actions.full")
              }
              variant={openForJoin ? "primary" : "outline"}
              style={styles.mainAction}
            />
          </View>
        </View>
      </ScrollView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: appTheme.spacing.lg,
  },
  coverWrap: {
    height: 210,
    marginTop: 0,
    borderTopLeftRadius: appTheme.radius.xl,
    borderTopRightRadius: appTheme.radius.xl,
    borderBottomLeftRadius: appTheme.radius.lg,
    borderBottomRightRadius: appTheme.radius.lg,
    overflow: "hidden",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  body: {
    paddingHorizontal: appTheme.spacing.lg,
    paddingTop: appTheme.spacing.lg,
    gap: appTheme.spacing.lg,
  },
  headerBlock: {
    gap: appTheme.spacing.sm,
  },
  modalTitle: {
    color: appTheme.colors.textPrimary,
    fontSize: 20,
    fontWeight: "700",
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: appTheme.spacing.sm,
  },
  infoList: {
    gap: appTheme.spacing.sm,
    borderRadius: appTheme.radius.md,
    padding: appTheme.spacing.md,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    backgroundColor: appTheme.colors.surfaceMuted,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: appTheme.spacing.sm,
  },
  infoLabel: {
    color: appTheme.colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    minWidth: 54,
    marginTop: 1,
  },
  infoValue: {
    flex: 1,
    color: appTheme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: appTheme.spacing.sm,
  },
  sideAction: {
    flex: 1,
  },
  mainAction: {
    flex: 1.3,
  },
});
